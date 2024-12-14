import { products } from "./data.js";
localStorage.removeItem("idDetailProduct");

const getItem = (items) => {
  if (Array.isArray(items)) {
    $(".products").empty();
    items.map((item) => {
      let html = `
                      <div class="col-md-4">
                          <div class="card mb-4 box-shadow">
                              <button class="btn detailProduct" value="${item.id}">
                                  <img class="card-img-top"
                                      style="height: 225px;"
                                      src="./img/${item.image}">
                              </button>
  
                              <div class="card-body">
                                  <p class="card-text" style="height: 72px">${item.title}</p>
                                  <div
                                      class="d-flex justify-content-between align-items-center">
                                      <div class="btn-group">
                                          <button type="button" class="btn btn-sm btn-outline-secondary">Xem</button>
                                      </div>
                                      <div class="text-danger font-weight-bold" style="font-size: 20px;">
                                          <span class="price">${item.price}</span>
                                          <span class="unit">${item.unit}</span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  `;
      $(".products").append(html);
    });

    $(".detailProduct")
      .off("click")
      .on("click", (e) => {
        const detailProduct = $(e.currentTarget).val();
        localStorage.setItem("idDetailProduct", detailProduct);
        window.location.href = "./detail.html";
      });
  }
};

getItem(products);

// debouce

const searchDebounce = (callback, delay) => {
  let idTimeOut;
  return (search) => {
    clearTimeout(idTimeOut);
    idTimeOut = setTimeout(() => {
      callback(search);
    }, delay);
  };
};

// handle product
const handleProducts = (search) => {
  const searchProducts = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );
  getItem(searchProducts);
};

const handleProductsDebounce = searchDebounce(handleProducts, 700);

$("#search").on("input", () => {
  const searchInput = $("#search").val();
  if (searchInput.length === 0) {
    getItem(products);
  } else if (searchInput.length > 2) {
    handleProductsDebounce(searchInput);
  }
});
