const Product = require('../models/product.js');
const mongoose = require('mongoose');
const configDB = require('../config/configDB');

mongoose.connect(process.env.MONGODB_URI || configDB.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.once('open', () => { console.log('MongoDB connected!') });
mongoose.connection.on('error', (err) => { console.log('MongoDB connection error: ' + err) });

console.log(configDB.url);
let prods = [
    new Product(
        {
            imagePath: '../uploads/1-lien-quan-mobile.jpg',
            title: 'Liên Quân Mobile',
            description: 'Liên Quân Mobile được xây dựng trên nền tảng hiện đại engine Unity 3D. Chính nhờ một nền đồ họa mạnh mẽ như vậy nên game thỏa sức xây dựng những với nhiều chế độ đấu từ đấu thường, đấu hạng đến chế độ giải trí cùng các vị tướng liên tục được cập nhập, những tuyến nhân vật được tạo hình chi tiết, mạnh mẽ cùng một hệ thống chiêu thức đồ sộ vô cùng sinh động, đẹp mắt.',
            price: 10
        }),
    new Product({
        imagePath: '../uploads/2-pubg-mobile.jpg',
        title: 'PUBG Mobile',
        description: 'Sinh tồn là thể loại game mới nổi trên thị trường hiện nay. Nếu bạn thích thể loại bắn súng và sinh tồn, lựa chọn hoàn hảo cho bạn chính là PUBG Mobile. Phải nói phần lớn Game thủ Việt Nam đều chơi PUBG Mobile, bởi chính game này không hút máu người chơi. Thắng bại tại kỹ năng mà không sự khác biệt giữa người chơi nạp nhiều và người chơi nạp ít.',
        price: 12
    }),
    new Product({
        imagePath: '../uploads/3-vung-dat-gio.jpg',
        title: 'Vùng đất gió',
        description: 'Tham gia trò chơi bạn có thể lựa chọn hóa thân vào 5 nghề nghiệp bao gồm Chiến Sĩ, Pháp Sư, Mục sư, Sát thủ và Ngự Vĩ chưa mở. Mỗi nghề nghiệp lại có những nhiệm vụ và sức mạnh khác nhau đòi hỏi người chơi cần phải thông thạo, đầu tư thời gian tìm hiểu mới nắm rõ được.',
        price: 10
    }),
    new Product({
        imagePath: '../uploads/5-asphalt-xtreme.jpg',
        title: 'Asphalt Xtreme',
        description: 'Asphalt Xtreme sẽ đưa bạn đến những vùng đất mà chưa ai đặt chân đến. Game thủ sẽ được thỏa sức thể hiện kỹ năng điều khiển xe địa hình xuyên qua nhiều cung đường vòng vèo, khúc khuỷu như sa mạc cát hay rừng núi, đổ đèo đầy chất máu lửa.',
        price: 15
    }),
    new Product({
        imagePath: '../uploads/4-fifa.jpg',
        title: 'FIFA 20 Mobile',
        description: 'Fifa 20 Mobile là một tựa game được làm lại từ PC, tuy nhiên so với phiên bản trên máy tính, phiên bản mobile lần này có lẽ vẫn chưa được trau chuốt về phần hình ảnh lắm khiến hình ảnh không quá mượt mà nhưng bù lại, người chơi trên phiên bản Mobile sẽ rất dễ dàng kiếm được cầu thủ ngon, thậm chí là những siêu sao đang hot..',
        price: 20
    }),
    new Product(
        {
            imagePath: '../uploads/image-0.jpg',
            title: 'Liên Quân Mobile',
            description: 'Liên Quân Mobile được xây dựng trên nền tảng hiện đại engine Unity 3D. Chính nhờ một nền đồ họa mạnh mẽ như vậy nên game thỏa sức xây dựng những với nhiều chế độ đấu từ đấu thường, đấu hạng đến chế độ giải trí cùng các vị tướng liên tục được cập nhập, những tuyến nhân vật được tạo hình chi tiết, mạnh mẽ cùng một hệ thống chiêu thức đồ sộ vô cùng sinh động, đẹp mắt.',
            price: 10
        }),
    new Product({
        imagePath: '../uploads/image-1.jpg',
        title: 'PUBG Mobile',
        description: 'Sinh tồn là thể loại game mới nổi trên thị trường hiện nay. Nếu bạn thích thể loại bắn súng và sinh tồn, lựa chọn hoàn hảo cho bạn chính là PUBG Mobile. Phải nói phần lớn Game thủ Việt Nam đều chơi PUBG Mobile, bởi chính game này không hút máu người chơi. Thắng bại tại kỹ năng mà không sự khác biệt giữa người chơi nạp nhiều và người chơi nạp ít.',
        price: 12
    }),
    new Product({
        imagePath: '../uploads/image-2.jpg',
        title: 'Vùng đất gió',
        description: 'Tham gia trò chơi bạn có thể lựa chọn hóa thân vào 5 nghề nghiệp bao gồm Chiến Sĩ, Pháp Sư, Mục sư, Sát thủ và Ngự Vĩ chưa mở. Mỗi nghề nghiệp lại có những nhiệm vụ và sức mạnh khác nhau đòi hỏi người chơi cần phải thông thạo, đầu tư thời gian tìm hiểu mới nắm rõ được.',
        price: 10
    }),
    new Product({
        imagePath: '../uploads/image-3.jpg',
        title: 'Asphalt Xtreme',
        description: 'Asphalt Xtreme sẽ đưa bạn đến những vùng đất mà chưa ai đặt chân đến. Game thủ sẽ được thỏa sức thể hiện kỹ năng điều khiển xe địa hình xuyên qua nhiều cung đường vòng vèo, khúc khuỷu như sa mạc cát hay rừng núi, đổ đèo đầy chất máu lửa.',
        price: 15
    }),
    new Product({
        imagePath: '../uploads/image-4.jpg',
        title: 'FIFA 20 Mobile',
        description: 'Fifa 20 Mobile là một tựa game được làm lại từ PC, tuy nhiên so với phiên bản trên máy tính, phiên bản mobile lần này có lẽ vẫn chưa được trau chuốt về phần hình ảnh lắm khiến hình ảnh không quá mượt mà nhưng bù lại, người chơi trên phiên bản Mobile sẽ rất dễ dàng kiếm được cầu thủ ngon, thậm chí là những siêu sao đang hot..',
        price: 20
    }),
    new Product({
        imagePath: '../uploads/image-5.jpg',
        title: 'FIFA 20 Mobile',
        description: 'Fifa 20 Mobile là một tựa game được làm lại từ PC, tuy nhiên so với phiên bản trên máy tính, phiên bản mobile lần này có lẽ vẫn chưa được trau chuốt về phần hình ảnh lắm khiến hình ảnh không quá mượt mà nhưng bù lại, người chơi trên phiên bản Mobile sẽ rất dễ dàng kiếm được cầu thủ ngon, thậm chí là những siêu sao đang hot..',
        price: 20
    }),
    new Product(
        {
            imagePath: '../uploads/image-6.jpg',
            title: 'Liên Quân Mobile',
            description: 'Liên Quân Mobile được xây dựng trên nền tảng hiện đại engine Unity 3D. Chính nhờ một nền đồ họa mạnh mẽ như vậy nên game thỏa sức xây dựng những với nhiều chế độ đấu từ đấu thường, đấu hạng đến chế độ giải trí cùng các vị tướng liên tục được cập nhập, những tuyến nhân vật được tạo hình chi tiết, mạnh mẽ cùng một hệ thống chiêu thức đồ sộ vô cùng sinh động, đẹp mắt.',
            price: 10
        }),
    new Product({
        imagePath: '../uploads/image-7.jpg',
        title: 'PUBG Mobile',
        description: 'Sinh tồn là thể loại game mới nổi trên thị trường hiện nay. Nếu bạn thích thể loại bắn súng và sinh tồn, lựa chọn hoàn hảo cho bạn chính là PUBG Mobile. Phải nói phần lớn Game thủ Việt Nam đều chơi PUBG Mobile, bởi chính game này không hút máu người chơi. Thắng bại tại kỹ năng mà không sự khác biệt giữa người chơi nạp nhiều và người chơi nạp ít.',
        price: 12
    }),
    new Product({
        imagePath: '../uploads/image-8.jpg',
        title: 'Vùng đất gió',
        description: 'Tham gia trò chơi bạn có thể lựa chọn hóa thân vào 5 nghề nghiệp bao gồm Chiến Sĩ, Pháp Sư, Mục sư, Sát thủ và Ngự Vĩ chưa mở. Mỗi nghề nghiệp lại có những nhiệm vụ và sức mạnh khác nhau đòi hỏi người chơi cần phải thông thạo, đầu tư thời gian tìm hiểu mới nắm rõ được.',
        price: 10
    }),
    new Product({
        imagePath: '../uploads/image-9.jpg',
        title: 'Asphalt Xtreme',
        description: 'Asphalt Xtreme sẽ đưa bạn đến những vùng đất mà chưa ai đặt chân đến. Game thủ sẽ được thỏa sức thể hiện kỹ năng điều khiển xe địa hình xuyên qua nhiều cung đường vòng vèo, khúc khuỷu như sa mạc cát hay rừng núi, đổ đèo đầy chất máu lửa.',
        price: 15
    }),
    new Product({
        imagePath: '../uploads/image-10.jpg',
        title: 'FIFA 20 Mobile',
        description: 'Fifa 20 Mobile là một tựa game được làm lại từ PC, tuy nhiên so với phiên bản trên máy tính, phiên bản mobile lần này có lẽ vẫn chưa được trau chuốt về phần hình ảnh lắm khiến hình ảnh không quá mượt mà nhưng bù lại, người chơi trên phiên bản Mobile sẽ rất dễ dàng kiếm được cầu thủ ngon, thậm chí là những siêu sao đang hot..',
        price: 20
    }),
    new Product({
        imagePath: '../uploads/image-11.jpg',
        title: 'FIFA 20 Mobile',
        description: 'Fifa 20 Mobile là một tựa game được làm lại từ PC, tuy nhiên so với phiên bản trên máy tính, phiên bản mobile lần này có lẽ vẫn chưa được trau chuốt về phần hình ảnh lắm khiến hình ảnh không quá mượt mà nhưng bù lại, người chơi trên phiên bản Mobile sẽ rất dễ dàng kiếm được cầu thủ ngon, thậm chí là những siêu sao đang hot..',
        price: 20
    }),
    new Product({
        imagePath: '../uploads/image-12.jpg',
        title: 'FIFA 20 Mobile',
        description: 'Fifa 20 Mobile là một tựa game được làm lại từ PC, tuy nhiên so với phiên bản trên máy tính, phiên bản mobile lần này có lẽ vẫn chưa được trau chuốt về phần hình ảnh lắm khiến hình ảnh không quá mượt mà nhưng bù lại, người chơi trên phiên bản Mobile sẽ rất dễ dàng kiếm được cầu thủ ngon, thậm chí là những siêu sao đang hot..',
        price: 20
    }),
    new Product({
        imagePath: '../uploads/image-13.jpg',
        title: 'FIFA 20 Mobile',
        description: 'Fifa 20 Mobile là một tựa game được làm lại từ PC, tuy nhiên so với phiên bản trên máy tính, phiên bản mobile lần này có lẽ vẫn chưa được trau chuốt về phần hình ảnh lắm khiến hình ảnh không quá mượt mà nhưng bù lại, người chơi trên phiên bản Mobile sẽ rất dễ dàng kiếm được cầu thủ ngon, thậm chí là những siêu sao đang hot..',
        price: 20
    }),
    new Product({
        imagePath: '../uploads/image-14.jpg',
        title: 'FIFA 20 Mobile',
        description: 'Fifa 20 Mobile là một tựa game được làm lại từ PC, tuy nhiên so với phiên bản trên máy tính, phiên bản mobile lần này có lẽ vẫn chưa được trau chuốt về phần hình ảnh lắm khiến hình ảnh không quá mượt mà nhưng bù lại, người chơi trên phiên bản Mobile sẽ rất dễ dàng kiếm được cầu thủ ngon, thậm chí là những siêu sao đang hot..',
        price: 20
    }),
    new Product({
        imagePath: '../uploads/image-15.jpg',
        title: 'FIFA 20 Mobile',
        description: 'Fifa 20 Mobile là một tựa game được làm lại từ PC, tuy nhiên so với phiên bản trên máy tính, phiên bản mobile lần này có lẽ vẫn chưa được trau chuốt về phần hình ảnh lắm khiến hình ảnh không quá mượt mà nhưng bù lại, người chơi trên phiên bản Mobile sẽ rất dễ dàng kiếm được cầu thủ ngon, thậm chí là những siêu sao đang hot..',
        price: 20
    }),
    new Product({
        imagePath: '../uploads/image-16.jpg',
        title: 'FIFA 20 Mobile',
        description: 'Fifa 20 Mobile là một tựa game được làm lại từ PC, tuy nhiên so với phiên bản trên máy tính, phiên bản mobile lần này có lẽ vẫn chưa được trau chuốt về phần hình ảnh lắm khiến hình ảnh không quá mượt mà nhưng bù lại, người chơi trên phiên bản Mobile sẽ rất dễ dàng kiếm được cầu thủ ngon, thậm chí là những siêu sao đang hot..',
        price: 20
    }),
    new Product({
        imagePath: '../uploads/image-17.jpg',
        title: 'FIFA 20 Mobile',
        description: 'Fifa 20 Mobile là một tựa game được làm lại từ PC, tuy nhiên so với phiên bản trên máy tính, phiên bản mobile lần này có lẽ vẫn chưa được trau chuốt về phần hình ảnh lắm khiến hình ảnh không quá mượt mà nhưng bù lại, người chơi trên phiên bản Mobile sẽ rất dễ dàng kiếm được cầu thủ ngon, thậm chí là những siêu sao đang hot..',
        price: 20
    }),
    new Product({
        imagePath: '../uploads/image-18.jpg',
        title: 'FIFA 20 Mobile',
        description: 'Fifa 20 Mobile là một tựa game được làm lại từ PC, tuy nhiên so với phiên bản trên máy tính, phiên bản mobile lần này có lẽ vẫn chưa được trau chuốt về phần hình ảnh lắm khiến hình ảnh không quá mượt mà nhưng bù lại, người chơi trên phiên bản Mobile sẽ rất dễ dàng kiếm được cầu thủ ngon, thậm chí là những siêu sao đang hot..',
        price: 20
    }),
    new Product({
        imagePath: '../uploads/image-19.jpg',
        title: 'FIFA 20 Mobile',
        description: 'Fifa 20 Mobile là một tựa game được làm lại từ PC, tuy nhiên so với phiên bản trên máy tính, phiên bản mobile lần này có lẽ vẫn chưa được trau chuốt về phần hình ảnh lắm khiến hình ảnh không quá mượt mà nhưng bù lại, người chơi trên phiên bản Mobile sẽ rất dễ dàng kiếm được cầu thủ ngon, thậm chí là những siêu sao đang hot..',
        price: 20
    }),
    new Product({
        imagePath: '../uploads/image-20.jpg',
        title: 'FIFA 20 Mobile',
        description: 'Fifa 20 Mobile là một tựa game được làm lại từ PC, tuy nhiên so với phiên bản trên máy tính, phiên bản mobile lần này có lẽ vẫn chưa được trau chuốt về phần hình ảnh lắm khiến hình ảnh không quá mượt mà nhưng bù lại, người chơi trên phiên bản Mobile sẽ rất dễ dàng kiếm được cầu thủ ngon, thậm chí là những siêu sao đang hot..',
        price: 20
    }),
    new Product({
        imagePath: '../uploads/image-21.jpg',
        title: 'FIFA 20 Mobile',
        description: 'Fifa 20 Mobile là một tựa game được làm lại từ PC, tuy nhiên so với phiên bản trên máy tính, phiên bản mobile lần này có lẽ vẫn chưa được trau chuốt về phần hình ảnh lắm khiến hình ảnh không quá mượt mà nhưng bù lại, người chơi trên phiên bản Mobile sẽ rất dễ dàng kiếm được cầu thủ ngon, thậm chí là những siêu sao đang hot..',
        price: 20
    })
];

let done = 0;
for (let i = 0; i < prods.length; ++i) {
    prods[i].save((err, result) => {
        ++done;
        if (done === prods.length) {
            exit();
            console.log(done);
        }

    });
}
function exit() {
    mongoose.disconnect();
}