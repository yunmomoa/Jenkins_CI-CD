import { jsx as _jsx } from "react/jsx-runtime";
import { useDaumPostcodePopup } from 'react-daum-postcode';
// @ts-ignore
const AddressForm = ({ setAddressApi }) => {
    const open = useDaumPostcodePopup();
    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';
        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }
        setAddressApi(fullAddress);
    };
    const handleClick = () => {
        open({ onComplete: handleComplete });
    };
    return (_jsx("button", { type: 'button', style: buttonStyle, onClick: handleClick, children: "\uC8FC\uC18C \uCC3E\uAE30" }));
};
const buttonStyle = {
    padding: "12px",
    border: "1px solid #D5D5D5",
    borderRadius: "4px",
};
export default AddressForm;
