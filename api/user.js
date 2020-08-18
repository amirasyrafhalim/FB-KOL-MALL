import { apiRoutes } from '@/config'


export default class User {
  constructor(axios, module) {
    this.axios = axios
    this.module = module
  }
}
