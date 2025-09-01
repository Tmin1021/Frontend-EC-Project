import { useEffect, useRef } from "react";
import { toast, Toaster } from "sonner";
import BEApi from "../../../service/BEApi";
import { createProductParams } from "../../components/functions/product_functions";
import { assets } from "../../data/dummy";

function DemoAPI() {
  const fileInputRef = useRef(null);
  console.log(Object.keys(assets))

  useEffect(() => {
    async function fetchUsers() {
      try {
        console.log("Hello");
        const res = await BEApi.UserApi.getById('68b192b6f62f87ee1a7f23ae')
        console.log(res.data);
      } catch (err) {
        console.log(err);
        toast.error("Error fetching users");
      }
    }

    fetchUsers();
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await BEApi.ImageApi.upload(formData); // assuming you created this
      console.log(res.data);
      toast.success("Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    }
  };

  return (
    <div>
      <div
        onClick={handleUploadClick}
        className="bg-purple-500 p-2 rounded-md text-white w-fit cursor-pointer"
      >
        Upload Image
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Toaster />
    </div>
  );
}

export default DemoAPI;
