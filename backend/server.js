import app from "./app.js";
import cloudinary from "cloudinary";

const port = process.env.PORT;

cloudinary.v2.config({
    cloud_name: process.env.CL0UDINARY_CLOUD_NAME,
    api_key: process.env.CL0UDINARY_API_KEY,
    api_secret: process.env.CL0UDINARY_API_SECRETS,
})

app.listen(port,()=>{
    console.log(`Server listening on port ${port}.`);
});

