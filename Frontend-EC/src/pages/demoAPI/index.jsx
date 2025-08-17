import { getProducts } from "../../../service/Api";

function DemoAPI() {
  const all_products = getProducts()
  console.log(all_products)

  return (
    <div>
        index
    </div>
  )
}

export default DemoAPI;