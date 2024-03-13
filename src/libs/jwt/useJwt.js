import JwtService from './jwtService'
import axios from '@/libs/axios'

export default new JwtService(axios, {})
