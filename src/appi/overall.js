import request from "./request";

export async function getOverall(){
    return await request.get("/api/overall");
}