import { isDraft, original, produce } from "immer"
import type { StateCreator, StoreApi, UseBoundStore } from "zustand"
import type { PersistStorage } from "zustand/middleware"
import { devtools } from "zustand/middleware"
import { shallow } from "zustand/shallow"
import type { UseBoundStoreWithEqualityFn } from "zustand/traditional"
import { createWithEqualityFn } from "zustand/traditional"

import { runTransactionInScope } from "~/database"

declare const window: any
export const localStorage: PersistStorage<any> = {
  getItem: (name: string) => {
    const data = window.localStorage.getItem(name)

    if (data === null) {
      return null
    }

    try {
      return JSON.parse(data)
    } catch {
      return data
    }
  },
  setItem: (name, value) => {
    window.localStorage.setItem(name, JSON.stringify(value))
  },
  removeItem: (name: string) => {
    window.localStorage.removeItem(name)
  },
}

const storeMap = {} as Record<string, UseBoundStoreWithEqualityFn<any>>

export const createZustandStore =
  <S, T extends StateCreator<S, [], []> = StateCreator<S, [], []>>(name: string) =>
  (store: T) => {
    if (import.meta.env.DEV && window[`store_${name}`]) {
      import.meta.hot?.send("message", "The store has been changed, reloading...")
      globalThis.location.reload()
    }

    const newStore = import.meta.env.DEV
      ? createWithEqualityFn(
          devtools(store, {
            enabled: DEBUG,
            name,
          }),
          shallow,
        )
      : createWithEqualityFn(store, shallow)

    storeMap[name] = newStore

    window.store =
      window.store ||
      new Proxy(
        {},
        {
          get(_, prop) {
            if (prop in storeMap) {
              return storeMap[prop as string].getState()
            }
            return
          },
        },
      )

    window[`store_${name}`] = newStore

    return newStore
  }
type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never
}[keyof T]

type FunctionProps<T> = Pick<T, FunctionKeys<T>>
export const getStoreActions = <T extends { getState: () => any }>(
  store: T,
): FunctionProps<ReturnType<T["getState"]>> => {
  const actions = {}
  const state = store.getState()
  for (const key in state) {
    if (typeof state[key] === "function") {
      actions[key] = state[key]
    }
  }

  return actions as any
}

export function createImmerSetter<T>(useStore: UseBoundStore<StoreApi<T>>) {
  return (updater: (state: T) => void) =>
    useStore.setState((state) =>
      produce(state, (draft) => {
        updater(draft as T)
      }),
    )
}

type MayBeDraft<T> = T
export const toRaw = <T>(draft: MayBeDraft<T>): T => {
  return isDraft(draft) ? original(draft)! : draft
}

class Transaction<S, Ctx> {
  private _snapshot: S
  private _ctx: Ctx
  private onRollback?: (snapshot: S, ctx: Ctx) => Promise<void>
  private executorFn?: (snapshot: S, ctx: Ctx) => Promise<void>
  private optimisticExecutor?: (snapshot: S, ctx: Ctx) => Promise<void>
  private onPersist?: (snapshot: S, ctx: Ctx) => Promise<void>

  constructor(snapshot?: S, ctx?: Ctx) {
    this._snapshot = snapshot || ({} as S)
    this._ctx = ctx || ({} as Ctx)
  }

  rollback(fn: (snapshot: S, ctx: Ctx) => Promise<void>): this {
    this.onRollback = fn
    return this
  }

  execute(executor: (snapshot: S, ctx: Ctx) => Promise<void>): this {
    this.executorFn = executor
    return this
  }

  optimistic(executor: (snapshot: S, ctx: Ctx) => Promise<void>): this {
    this.optimisticExecutor = executor
    return this
  }

  persist(fn: (snapshot: S, ctx: Ctx) => Promise<void>): this {
    this.onPersist = fn
    return this
  }

  async run(): Promise<void> {
    let isOptimisticFailed = false

    if (this.optimisticExecutor) {
      try {
        await this.optimisticExecutor(this._snapshot, this._ctx)
      } catch (error) {
        isOptimisticFailed = true
        console.error(error)
      }
    }

    if (this.executorFn) {
      try {
        await this.executorFn(this._snapshot, this._ctx)
      } catch (err) {
        if (this.onRollback && !isOptimisticFailed) {
          await this.onRollback(this._snapshot, this._ctx)
        }
        throw err
      }
    }

    if (this.onPersist) {
      await runTransactionInScope(() => this.onPersist!(this._snapshot, this._ctx))
    }
  }
}

export const createTransaction = <S, Ctx>(snapshot?: S, ctx?: Ctx): Transaction<S, Ctx> => {
  return new Transaction(snapshot, ctx)
}
