import {type Order} from "../schemas/order.schema";
import { z } from 'zod';

export default class OrderService {

    constructor() {

    }

    public async createOrder(order: Order) {
        // order: Order = {
        //     status: "pending",
        //     total: 0,
        //     shippingDetails: ,
        //     orderProduct: []
        // }
        // TODO: La solicitud a la bd

        console.log(order);
    }

}