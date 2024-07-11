import Header from "@/components/Header";
import { NextPage } from "next";

const Profile: NextPage<any> = () => {
  return (
    <div className='w-full h-screen flex flex-col'>
      <div className='p-6'>
        <div className='h-[1px] bg-black   bg-opacity-20 my-4 max-lg:hidden' />

        <div className='max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg'>
          <h1 className='text-3xl font-bold mb-6 text-gray-800'>Chính Sách Bảo Mật</h1>

          <h2 className='text-2xl font-semibold mb-4 text-gray-700'>1. Chính Sách Nội Dung</h2>
          <div className='mb-6'>
            <p className='text-gray-700 mb-2'>
              Ứng dụng Mặt Trận Hà Nội cam kết tuân thủ các chính sách nội dung của Google Play, đảm bảo rằng tất cả các
              nội dung trong ứng dụng đều phù hợp và không vi phạm quy định. Cụ thể:
            </p>
            <ul className='list-disc list-inside text-gray-700'>
              <li className='mb-2'>
                Không chứa nội dung bạo lực: Ứng dụng sẽ không bao gồm bất kỳ hình ảnh, video, hoặc văn bản nào có nội
                dung bạo lực.
              </li>
              <li className='mb-2'>
                Không phân biệt đối xử: Nội dung trong ứng dụng sẽ không bao giờ phân biệt đối xử dựa trên chủng tộc,
                tôn giáo, giới tính, quốc tịch, khuyết tật, hoặc bất kỳ đặc điểm cá nhân nào khác. Ví dụ: không có bình
                luận hoặc bài viết mang tính phân biệt đối xử hoặc kỳ thị.
              </li>
              <li className='mb-2'>
                Không chứa thông tin sai lệch: Ứng dụng sẽ cung cấp thông tin chính xác và có kiểm chứng, không chứa
                thông tin sai lệch hoặc gây hiểu lầm. Ví dụ: các tin tức và thông báo được đăng tải sẽ được kiểm tra kỹ
                lưỡng về tính chính xác và minh bạch.
              </li>
            </ul>
          </div>

          <h2 className='text-2xl font-semibold mb-4 text-gray-700'>2. Chính Sách Quyền Riêng Tư</h2>
          <div className='mb-6'>
            <p className='text-gray-700 mb-2'>
              Ứng dụng Mặt Trận Hà Nội đảm bảo bảo vệ quyền riêng tư của người dùng, cung cấp thông tin minh bạch về
              việc thu thập và sử dụng dữ liệu cá nhân. Cụ thể:
            </p>
            <ul className='list-disc list-inside text-gray-700'>
              <li className='mb-2'>
                Thu thập thông tin cần thiết: Ứng dụng chỉ thu thập các thông tin cần thiết như tên, email, địa chỉ, và
                số điện thoại để cung cấp dịch vụ hiệu quả. Ví dụ: chỉ yêu cầu người dùng cung cấp tên và email khi đăng
                ký nhận thông báo sự kiện.
              </li>
              <li className='mb-2'>
                Bảo mật dữ liệu cá nhân: Tất cả thông tin cá nhân của người dùng sẽ được mã hóa và bảo vệ an toàn bằng
                công nghệ SSL. Ví dụ: dữ liệu gửi qua ứng dụng sẽ được mã hóa để ngăn chặn việc truy cập trái phép.
              </li>
              <li className='mb-2'>
                Không chia sẻ thông tin với bên thứ ba: Thông tin cá nhân của người dùng sẽ không được chia sẻ với bên
                thứ ba mà không có sự đồng ý của họ. Ví dụ: không bán hoặc chia sẻ dữ liệu người dùng với các công ty
                quảng cáo mà không có sự đồng ý rõ ràng từ người dùng.
              </li>
              <li className='mb-2'>
                Chính sách quyền riêng tư chi tiết: Chính sách quyền riêng tư sẽ được cung cấp rõ ràng và dễ hiểu trên
                trang giới thiệu ứng dụng, giúp người dùng nắm rõ cách thông tin của họ được sử dụng. Ví dụ: trang chính
                sách quyền riêng tư sẽ giải thích rõ ràng việc thu thập, sử dụng, và bảo vệ dữ liệu cá nhân.
              </li>
            </ul>
          </div>

          <h2 className='text-2xl font-semibold mb-4 text-gray-700'>3. Chính Sách Về Quyền Sở Hữu Trí Tuệ</h2>
          <div className='mb-6'>
            <p className='text-gray-700 mb-2'>
              Ứng dụng Mặt Trận Hà Nội cam kết tuân thủ các quy định về quyền sở hữu trí tuệ, đảm bảo rằng tất cả nội
              dung và tài liệu trong ứng dụng đều hợp pháp và không vi phạm bản quyền. Cụ thể:
            </p>
            <ul className='list-disc list-inside text-gray-700'>
              <li className='mb-2'>
                Sử dụng nội dung có bản quyền hợp pháp: Tất cả các biểu tượng, hình ảnh, video và tài liệu sử dụng trong
                ứng dụng đều phải có bản quyền hợp pháp. Ví dụ: hình ảnh và video được sử dụng trong ứng dụng đều được
                tự thiết kế hoặc mua bản quyền từ các nguồn hợp pháp.
              </li>
              <li className='mb-2'>
                Tôn trọng quyền sở hữu trí tuệ của bên thứ ba: Ứng dụng sẽ không sử dụng bất kỳ nội dung nào vi phạm
                quyền sở hữu trí tuệ của bên thứ ba. Ví dụ: không sử dụng nhạc, hình ảnh hoặc video từ các nguồn không
                hợp pháp hoặc không có sự cho phép của chủ sở hữu.
              </li>
              <li className='mb-2'>
                Giải quyết khiếu nại về bản quyền: Ứng dụng sẽ có cơ chế giải quyết khiếu nại về vi phạm bản quyền, đảm
                bảo rằng mọi khiếu nại được xử lý kịp thời và đúng quy định. Ví dụ: nếu có bất kỳ khiếu nại nào về vi
                phạm bản quyền, chúng tôi sẽ xem xét và xử lý ngay lập tức, bao gồm cả việc gỡ bỏ nội dung vi phạm nếu
                cần thiết.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
