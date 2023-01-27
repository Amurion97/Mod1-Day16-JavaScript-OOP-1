class Temperature {
    constructor(temp) {
        this.celsius = temp;
    }
    toFahrenheit() {
        return this.celsius*1.8 + 32;
    }
    toKelvin() {
        return this.celsius + 273.15;
    }
    printConversion(){
        console.log(`${this.celsius}Celsius = ${this.toFahrenheit()}Fahrenheit = ${this.toKelvin()}Kelvin`)
    }
}
let aTemperature = new Temperature(25);
aTemperature.printConversion();