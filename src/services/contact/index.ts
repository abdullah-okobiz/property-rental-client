"use server";


import { apiBaseUrl } from "@/config/config";



export const contactSubmitFormApi = async(formData:any)=>{
    const res = await fetch(`${apiBaseUrl}/create-contact`,{
      method: 'POST',
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    
    })
    return res.json()

}


 