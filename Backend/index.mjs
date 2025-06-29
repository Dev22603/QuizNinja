import { app } from "./app.mjs";
import {config} from "./constants/config.mjs";
const port = config.PORT;
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});
