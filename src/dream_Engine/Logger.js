export default class Logger {
    log(level, message, style){
        const output = `%c[${level}] [${new Date().toISOString().replace(`T`,'.').split('.')[0]}] ${message}`
        console.log(output, style)

    }

    info(message) 
    {
    this.log("INF", message, "color: green;")
    }
        
    error(message) 
    {
        this.log("ERR", message, "color: red;")
    }
    
    debug(message)
    {
        this.log("DEB", message, "color: blue;")
    }
        
}
