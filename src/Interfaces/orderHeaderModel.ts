import { SD_Status } from "../Utility/SD"
import OrderDetail from "./orderDetailModel"

export default interface orderHeaderModel {
    orderHeaderId?: number
    pickupName?: string
    pickupPhoneNumber?: string
    pickupEmail?: string
    applicationUserId?: string
    user?: any
    orderTotal?: number
    orderDate?: string
    stripePaymentIntentID?: string
    status?: SD_Status;
    totalItems?: number
    orderDetails?: OrderDetail[]
  }