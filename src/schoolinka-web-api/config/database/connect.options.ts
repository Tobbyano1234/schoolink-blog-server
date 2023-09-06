import { ConnectOptions } from "mongoose";

export const LiveDBConnectOptions: ConnectOptions = { keepAlive: true };
export const MockDBConnectOptions: ConnectOptions = {};