console.log("external script");

let Product = {
    Name: "Laptop",
    Price: 10000000,
    Description: "A high-performance laptop for work and play.",
}

console.log(Product);

Product['Review'] = "This laptop is amazing!";

console.log(Product);

delete Product.Price;

console.log(Product);

function getKey(){
    let key = prompt("Enter the Laptop Model Name:");
    let value = prompt("Enter Your Budget:");
    let bag={
        [key]: value
    };
    console.log(bag);

}
for (key in Product){
    let str = `${key}: ${Product[key]}<br>`;
    document.write(str);
}

