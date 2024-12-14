import { products } from "./data.js";


const id = localStorage.getItem("idDetailProduct");
if (id) {
  const productDetail = products.find((item) => item.id == id);
  $(".img_element").attr("src", `./img/${productDetail.image}`);
  $(".name_product").html(productDetail.title);
  $(".price_product_detail").html(
    `${Number(productDetail.price).toLocaleString("en-US")} ${
      productDetail.unit
    }`
  );
  productDetail.size.map((item) => {
    $("#size").append(`<option value="${item}">${item}</option>`);
  });
  $(".description").html(productDetail.description);

  const handleCartProduct = (productId) => {
    if (productId) {
      // const getId = JSON.parse(localStorage.getItem("cart"));
      const listProducts = products.filter((item) => {
        return productId.find((id) => id == item.id);
      });
      console.log(listProducts);
      $(".count_cart").html(listProducts.length);
      listProducts.map((product) => {
        const html = `<section class="d-flex py-2">
          <div class="col-sm-3">
              <div class="rounded">
                  <img src="../img/${
                    product.image
                  }" class="img-thumbnail" style="height: 70px;" alt="">
              </div>
          </div>
          <div class="col-sm-5">
              <p class="text-left text-dark">${product.title}</p>
          </div>
          <div class="col-sm-4">
              <span style="font-size: 15px; color: red;">${Number(
                product.price
              ).toLocaleString("en-US")} ${product.unit}</span>
          </div>
      </section>`;
        $(".listProducts").append(html);
      });
    }
  };

  const handleAddCart = () => {
    console.log(1);
    const getIdLocal = localStorage.getItem("cart");
    if (getIdLocal) {
      const arrId = [...JSON.parse(getIdLocal), id];
      localStorage.setItem("cart", JSON.stringify([...new Set(arrId)]));
      // console.log([...new Set(arrId)])
      handleCartProduct([...new Set(arrId)]);
    } else {
      localStorage.setItem("cart", JSON.stringify([id]));
    }
  };
  $(".add_product_cart").on("click", handleAddCart);
  // console.log([...JSON.parse(localStorage.getItem("cart"))])
  handleCartProduct([...JSON.parse(localStorage.getItem("cart"))]);
  const productOrder = products.filter((product) => product.id != id);

  productOrder.map((item) => {
    const html = `<div class="splq">
        <button class="btn btnProduct" style="padding: 0;" value="${
          item.id
        }"><div><img
                    src="./img/${item.image}"
                    alt></div></button>
        <p>${item.title}</p>
        <p>${Number(item.price).toLocaleString()} ${item.unit}</p>
    </div>`;
    $(".productOrder").append(html);
  });
  $(".btnProduct")
    .off("click")
    .on("click", (e) => {
      const btnProduct = $(e.currentTarget).val();
      localStorage.setItem("idDetailProduct", btnProduct);
      window.location.href = "./detail.html";
    });

  const btnIcon = document.querySelectorAll(".img_product_related>button");
  const carousel = document.querySelector(".img_product_related");
  const firstImg = carousel.querySelectorAll(
    ".img_product_related .productOrder .splq"
  )[0];
  let imgWidth = firstImg.clientWidth + 22;
  let scollWidth = carousel.scrollWidth - carousel.clientWidth;

  const showHiddenIcon = () => {
    btnIcon[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    btnIcon[1].style.display =
      carousel.scrollLeft == scollWidth ? "none" : "block";
  };

  btnIcon.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      e.preventDefault();
      carousel.scrollLeft += icon.id == "left" ? -imgWidth : imgWidth;
      setTimeout(() => {
        showHiddenIcon();
      }, 60);
    });
  });
} else {
  window.location.href = "./product.html";
  window.location.href = "./productnu.html";
  window.location.href = "./productnam.html";
}
