import React from "react"
import "./wrapper.css"

const Wrapper = () => {
  const data = [
    {
      cover: <i class='fa-solid fa-truck-fast'></i>,
      title: "Vận chuyển mọi nơi",
      decs: "Miễn phí vận chuyển cho đơn hàng trên 1 triệu đồng",
    },
    {
      cover: <i class='fa-solid fa-id-card'></i>,
      title: "Thanh toán đơn giản",
      decs: "Chuyển khoản hoặc COD",
    },
    {
      cover: <i class='fa-solid fa-headset'></i>,
      title: "Hỗ trợ 24/7 ",
      decs: "Bất cứ lúc nào bạn cần chúng tôi đều có mặt",
    },
    {
      cover: <i class='fa-solid fa-barcode'></i>,
      title: "Sản phẩm chính hãng",
      decs: "Tất cả sản phẩm đều có hóa đơn rõ ràng",
    },
  ]
  return (
    <>
      <section className='wrapper background'>
        <div className='container grid2'>
          {data.map((val, index) => {
            return (
              <div className='product' key={index}>
                <div className='img icon-circle'>
                  <i>{val.cover}</i>
                </div>
                <h3>{val.title}</h3>
                <p>{val.decs}</p>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default Wrapper
