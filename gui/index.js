window.onload = () => {
  // add hotkey ENTER for search
  document.addEventListener("keyup", e => {
    const productName = document.getElementById("search").value;
    if (productName !== "" && e.key === "Enter") {
      document.getElementById("searchProductByNameBtn").click();
    }
  });

  productsLoading();

  getProducts()
    .then(products => {
      saveToLS("products", products);
      renderProducts(products);
    });

  getCategories()
    .then(categories => {
      saveToLS("categories", categories);
      renderCategories(categories);
    });

  // BUSCAR PRODUCTO POR NOMBRE
  document.getElementById("searchProductByNameBtn").addEventListener("click", () => {
    productsLoading();
    // getProductsByNameFromLS()
    const productName = document.getElementById("search").value;
    if (productName === "") {
      alert("No se encontró ninguna palabra de búsqueda, ingrese un término de búsqueda");
      document.getElementById("search").focus();
    }
    getProductsByName(productName)
      .then(products => {
        renderProducts(products);
      });
  });

  // FILTRAR PRODUCTOS POR CATEGORIA
  document.getElementById("categories-root").addEventListener("change", e => {
    productsLoading();
    const categoryId = e.target.value;
    getProductsByCategory(categoryId)
      .then(products => {
        renderProducts(products);
      });
  });
};

// guardar los datos en LocalStorage
// disminuir la carga al servidor
const saveToLS = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// get data from LocalStorage if exists
const getFromLS = (key) => {
  const data = localStorage.getItem(key);
  if (data === null) {
    return [false, 0];
  }
  return [true, JSON.stringify(data)];
};

const renderCategories = (categories) => {
  document.getElementById("categories-root").innerHTML = "";
  if (categories.length > 0) {
    categories.map(category => categoryOptionComp(category))
      .forEach(categoryHtml => {
        document.getElementById("categories-root").innerHTML += categoryHtml;
      });
  } else {
    document.getElementById("categories-root").innerHTML = `
     <option value="1000000">no se encontró?</option>
    `;
  }
};

const categoryOptionComp = (category) => {
  const { id, name } = category;
  const html = `
    <option value="${id}">${name}</option>
  `;

  return html;
};

const productsLoading = () => {
  document.getElementById("products-root").innerHTML = `
    <img 
      src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia1.tenor.com%2Fimages%2Fd6cd5151c04765d1992edfde14483068%2Ftenor.gif%3Fitemid%3D5662595&f=1&nofb=1"
      class="mx-auto"
    />
  `;
};

const renderProducts = (products) => {
  document.getElementById("products-root").innerHTML = "";
  if (products.length > 0) {
    products.map(product => productComp(product))
      .forEach(productHtml => {
        document.getElementById("products-root").innerHTML += productHtml;
      });
  } else {
    document.getElementById("products-root").innerHTML = `
    <h2 class="text-center text-gray-500">No se encontraron productos</h2>
  `;
  }
};

const productComp = (product) => {
  const { name, price, discount } = product;
  const url_image = product.url_image
    ? product.url_image
    : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn2.iconfinder.com%2Fdata%2Ficons%2Fsymbol-blue-set-3%2F100%2FUntitled-1-94-512.png&f=1&nofb=1";
  // const src = "https://flowbite.com/docs/images/blog/image-1.jpg";
  const html = `
      <div class="w-full sm:w-80 md:w-80 lg:w-80 xl:w-96 max-w-lg  mx-1">
        <div
          class="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5"
        >
          <a href="#">
            <img class="rounded-t-lg fix-prod-img" src="${url_image}"/>
          </a>
          <div class="p-5 h-44">
            <a href="#">
              <h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2">
                ${name}
              </h5>
            </a>
            <p class="font-normal text-gray-700 mb-3">${price}</p>
            <a
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
              href="#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
      </div>
  `;
  return html;
};

// REQUESTS
const URL = "https://pruebasupergenial.herokuapp.com";
// const URL = "http://localhost:4000";

const getProducts = () => {
  const url = `${URL}/products`;
  return getRequest(url);
};

const getProductsByName = (name) => {
  const url = `${URL}/products/search/name/${name}`;
  return getRequest(url);
};

const getProductsByCategory = (categoryId) => {
  const url = `${URL}/products/category/${categoryId}`;
  return getRequest(url);
};

const getCategories = () => {
  const url = `${URL}/categories`;
  return getRequest(url);
};

const getRequest = (url) => {
  return fetch(url)
    .then(res => {
      if (res.ok || res.status === 404) {
        return res.json();
      } else {
        alert(
          `Hubo un problema con el servidor al mandar una request GET al url: ${url}, codigo HTTP ${res.status}`,
        );
        return { error: res.status };
      }
    });
};
