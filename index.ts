import "dotenv/config" 
import "module-alias/register"
import { Kernel } from "./src/kernel.js"

new Kernel().InitailizeApplication()