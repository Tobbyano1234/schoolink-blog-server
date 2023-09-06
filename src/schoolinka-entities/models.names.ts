import { UserRegistry } from "../famwork-push-server/services/entities/UserRegistry"
import { Admin } from "./Admin"
import { General } from "./General"
// import { Product } from "./Product"
import { Task } from "./Task"
import { TempStore } from "./TempStore"
import { User } from "./User"


export enum ModelNames {
    USER_REGISTRY = "userregistry",
    USER = "user",
    ADMIN = "admin",
    TASK = "task",
    GENERAL = "general",
    TEMP_STORE = "tempstore"
}

export type ModelTypeMap = {
    [ModelNames.USER_REGISTRY]: UserRegistry,
    [ModelNames.USER]: User,
    [ModelNames.ADMIN]: Admin,
    [ModelNames.TASK]: Task,
    [ModelNames.GENERAL]: General,
    [ModelNames.TEMP_STORE]: TempStore,
}