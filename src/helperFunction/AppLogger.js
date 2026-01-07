export const AppLogger = (fileToLog, messageToLog) => {
    console.log("%c===================================","color: red; font-size: 20px")
    console.log(`%c===================${messageToLog}====================`,"color:green;font-size:25px")
    console.log(fileToLog)
    console.log("%c===================================","color:red; font-size: 20px")

}