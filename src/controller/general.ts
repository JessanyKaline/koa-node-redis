import { BaseContext } from "koa";
import { description, request, summary, tagsAll } from "koa-swagger-decorator";
import { config } from "../config";
import jwt from "jsonwebtoken";


@tagsAll(["General"])
export default class GeneralController {

    @request("get", "/")
    @summary("Welcome page")
    @description("A simple welcome message to verify the service is up and running.")
    public static async helloWorld(ctx: BaseContext): Promise<void> {
        ctx.body = "Hello World!";
    }

    @request("post", "/auth/login")
    @summary("Token")
    @description("Endpoint for get token")
    public static async getToken(ctx: any): Promise<any> {
        const { username, password } = ctx.request.body;
        
        if (username === "admin" && password === "admin") {
            const token = jwt.sign(
                { username },
                config.jwtSecret,
                { expiresIn: "1d" }
            );
            ctx.body = { token };
        } else {
            ctx.status = 401;
            ctx.body = { message: "Invalid credentials" };
        }

    }

}