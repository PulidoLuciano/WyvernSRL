import { productType } from "../utils/types/productType";

const getAllCountries = async (url: string) => {
  try {
    const response = await fetch(`${url}`, {
      mode: 'cors',
      method: 'GET',
      credentials: 'include',
    })

    if (!response.ok) {
      console.log(response);
      console.log(response.json());
      throw new Error;
    }

    const countries = response.json();

    return countries;

  } catch (error) {
    console.log(error);
  }
}

const getAllStates = async (url: string) => {
  try {
    const response = await fetch(`${url}`, {
      mode: 'cors',
      method: 'GET',
      credentials: 'include',
    })

    if (!response.ok) {
      console.log(response);
      console.log(response.json());
      throw new Error;
    }

    const countries = response.json();

    return countries;

  } catch (error) {
    console.log(error);
  }
}

const getAllPlatforms = async (url: string) => {
  try {
    const response = await fetch(`${url}`, {
      mode: 'cors',
      method: 'GET',
      credentials: 'include',
    })

    if (!response.ok) {
      console.log(response);
      console.log(response.json());
      throw new Error;
    }

    const platforms = response.json();

    return platforms;

  } catch (error) {
    console.log(error);

  }
}


const getAllProducts = async (url: string) => {
  try {
    const response = await fetch(`${url}`, {
      mode: "cors",
      method: "GET",
      credentials: "include",
    })

    if (!response.ok) {
      console.log(response);
      console.log(await response.json());
      throw new Error;
    }

    const products = await response.json()
    return products;

  } catch (error) {
    console.log(error);

  }
}


const getAllMedias = async (url: string) => {
  try {
    const response = await fetch(`${url}`, {
      mode: 'cors',
      method: 'GET',
      credentials: 'include',
    })



    if (!response.ok) {
      throw new Error;
    }

    const medias = response.json();

    return medias;

  } catch (error) {
    console.log(error);

  }
}

const getAllCategories = async (url: string) => {
  try {
    const response = await fetch(`${url}`, {
      mode: "cors",
      method: "GET",
      credentials: "include",
    })

    if (!response.ok) {
      console.log(response);
      console.log(await response.json());
      throw new Error;
    }

    const products = await response.json()
    return products;

  } catch (error) {
    console.log(error);

  }
}

const getAllPositions = async (url: string) => {
  try {
    const response = await fetch(`${url}`, {
      mode: "cors",
      method: "GET",
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error;
    }

    const products = await response.json()
    return products;

  } catch (error) {
    console.log(error);

  }
}

const createProduct = async (productData: productType) => {
  const response = await fetch("http://localhost:3000/products", {
    mode: "cors",
    method: "POST",
    credentials: "include",
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      "nombre": productData.name,
      "lanzamiento": new Date(productData.date),
      "precio": Number(productData.price),
      "Categorias_id": Number(productData.category)

    })
  })


  if (!response.ok) {
    throw new Error;
  }

  const product = await response.json()
  return product;

}

const deleteObj = async (url: string, ids: Array<string>) => {
  const response = await fetch(`${url}`, {
    mode: "cors",
    method: "DELETE",
    credentials: "include",
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({ ids })
  })

  
  if (!response.ok) {
    throw new Error;
  }

  const obj = await response.json()
  return obj;

}

export const generalService = { deleteObj,createProduct, getAllStates, getAllCategories, getAllCountries, getAllPlatforms, getAllProducts, getAllMedias, getAllPositions }
