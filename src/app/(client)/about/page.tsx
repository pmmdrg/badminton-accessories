import {
  aboutUsImage,
  contactUsImage,
  coreValueImage,
  whyChooseUsImage,
} from '@/assets/images';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className='min-h-screen w-full bg-white py-12 px-6 flex flex-col items-center space-y-20'>
      <div className='flex flex-col md:flex-row items-center md:items-start md:space-x-12 max-w-5xl w-full'>
        <div className='relative w-full md:w-1/2 h-64 md:h-80 mb-6 md:mb-0 rounded-lg shadow-lg'>
          <Image
            src={aboutUsImage}
            alt='Về chúng tôi'
            fill
            className='object-cover rounded-lg'
          />
        </div>

        <div className='md:w-1/2'>
          <h1 className='text-4xl font-bold mb-4'>Về Chúng Tôi</h1>
          <p className='text-lg leading-relaxed'>
            Chúng tôi là cửa hàng chuyên cung cấp phụ kiện cầu lông chất lượng
            cao cho người chơi ở mọi cấp độ. Sứ mệnh của chúng tôi là mang đến
            những sản phẩm uy tín, giá cả hợp lý và trải nghiệm mua sắm dễ dàng,
            nhanh chóng.
          </p>
        </div>
      </div>

      <div className='flex flex-col md:flex-row-reverse items-center md:items-start md:space-x-12 max-w-5xl w-full'>
        <div className='relative w-full md:w-1/2 h-64 md:h-80 mb-6 md:mb-0 rounded-lg shadow-lg'>
          <Image
            src={coreValueImage}
            alt='Giá trị cốt lõi'
            fill
            className='object-cover rounded-lg'
          />
        </div>

        <div className='md:w-1/2'>
          <h2 className='text-2xl font-semibold mb-4'>Giá Trị Cốt Lõi</h2>
          <ul className='text-left list-disc list-inside space-y-2 text-base'>
            <li>Chất lượng sản phẩm là ưu tiên hàng đầu.</li>
            <li>Giao hàng nhanh chóng và hỗ trợ tận tâm.</li>
            <li>Luôn cập nhật xu hướng mới trong thể thao cầu lông.</li>
          </ul>
        </div>
      </div>

      <div className='flex flex-col md:flex-row items-center md:items-start md:space-x-12 max-w-5xl w-full'>
        <div className='relative w-full md:w-1/2 h-64 md:h-80 mb-6 md:mb-0 rounded-lg shadow-lg'>
          <Image
            src={whyChooseUsImage}
            alt='Tại sao chọn chúng tôi'
            fill
            className='object-cover rounded-lg'
          />
        </div>
        <div className='md:w-1/2'>
          <h2 className='text-2xl font-semibold mb-4'>
            Tại Sao Chọn Chúng Tôi?
          </h2>
          <p className='text-lg leading-relaxed'>
            Với đội ngũ có kinh nghiệm và đam mê cầu lông, chúng tôi hiểu rõ nhu
            cầu của người chơi. Mỗi sản phẩm đều được chọn lọc kỹ càng từ các
            thương hiệu uy tín nhằm đảm bảo sự an tâm cho khách hàng.
          </p>
        </div>
      </div>

      <div className='flex flex-col md:flex-row-reverse items-center md:items-start md:space-x-12 max-w-5xl w-full'>
        <div className='relative w-full md:w-1/2 h-64 md:h-80 mb-6 md:mb-0 rounded-lg shadow-lg'>
          <Image
            src={contactUsImage}
            alt='Liên hệ'
            fill
            className='object-cover rounded-lg'
          />
        </div>
        <div className='md:w-1/2'>
          <h2 className='text-2xl font-semibold mb-4'>Liên Hệ</h2>
          <p className='text-lg'>
            Trao đổi thêm với chúng tôi qua những phương thức sau, chúng tôi rất
            trân trọng những ý kiến đóng góp của quý khách hàng để chúng tôi có
            thể phục vụ tốt hơn:
          </p>
          <ul className='text-left list-disc list-inside space-y-2 text-base'>
            <li>Email: support@badmintonshop.vn</li>
            <li>Hotline: 0123 456 789</li>
            <li>Địa chỉ: 1 Võ Văn Ngân, phường Thủ Đức, TP.HCM</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
