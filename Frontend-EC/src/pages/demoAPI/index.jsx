import { toast, Toaster } from "sonner";
import { getProducts } from "../../../service/Api";

const invokeToast = () => {
  toast.success("Hello")
}

function DemoAPI() {
  /*
  const all_products = getProducts()
  console.log(1)
  console.log(all_products)
*/
  return (
    <div onClick={invokeToast}>
        index
        <Toaster />
    </div>
  )
}

export default DemoAPI;