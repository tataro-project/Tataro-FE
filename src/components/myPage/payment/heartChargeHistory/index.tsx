import useScreenWidth from '@/hooks/useScreenWidth';

import { mockPurchaseData } from '../mockData';

const HeartChargeHistory = () => {
  const { isInit, isCustomWidth } = useScreenWidth(640);

  if (!isInit) return null;

  return (
    <>
      <table className="w-full">
        <thead>
          <tr className="h-10 border-b-2 border-purple tracking-tighter">
            <td>
              <strong>구매일자</strong>
            </td>
            <td>
              <strong>구매개수</strong>
            </td>
            <td>
              <strong>결제금액</strong>
            </td>
            {!isCustomWidth && (
              <td>
                <strong>결제수단</strong>
              </td>
            )}
            <td>
              <strong>구매취소</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          {mockPurchaseData.map(({ purchaseDate, quantity, totalPrice, paymentMethod }) => (
            <tr
              key={purchaseDate}
              className="h-10 md:h-12 lg:h-14 border-b border-purple tracking-tight text-xs sm:text-sm"
            >
              <td>{purchaseDate.split('T')[0].replaceAll('-', '.')}</td>
              <td>{quantity}개</td>
              <td>{totalPrice}원</td>
              {!isCustomWidth && <td>{paymentMethod}</td>}
              <td>
                <button>취소</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default HeartChargeHistory;
