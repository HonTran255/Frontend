const icons = {
    'Chưa xử lý': <i className="fas fa-clipboard"></i>,
    'Đã xác nhận': <i className="fas fa-clipboard-check"></i>,
    'Đang giao hàng': <i className="fas fa-truck"></i>,
    'Đã giao hàng': <i className="fas fa-check-double"></i>,
    'Đã hủy': <i className="fas fa-times"></i>,
};

const colors = {
    'Chưa xử lý': 'warning',
    'Đã xác nhận': 'primary',
    'Đang giao hàng': 'info',
    'Đã giao hàng': 'success',
    'Đã hủy': 'danger',
};

const OrderStatusLabel = ({ status = '', detail = true }) => {

    if(status==0) status ='Chưa xử lý';
    if(status==1) status ='Đã xác nhận';
    if(status==2) status ='Đang giao hàng';
    if(status==3) status ='Đã giao hàng';
    if(status==4) status ='Đã hủy';
  
    return (
        <span className="d-inline-block position-relative">
            <span
                className={`badge text-white bg-${colors[status]} cus-tooltip`}
            >
                {icons[status]}
                {detail && <span className="ms-2">{status}</span>}
            </span>

            <small className="cus-tooltip-msg">{status}</small>
        </span>
    );
};

export default OrderStatusLabel;
