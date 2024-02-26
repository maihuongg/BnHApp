const Realm = require('realm');
// const { addSuKien, addBenhVien } = require('./realm');

const realm = new Realm({
    schema: [
        {
            name: 'SuKien',
            properties: {
                tenSuKien: 'string',
                benhVienPhuTrach: 'string',
                soLuongDaDangKy: 'int',
                soLuongToiDa: 'int',
                banner: 'string',
            },
        },
        {
            name: 'BenhVien',
            properties: {
                tenBenhVien: 'string',
                diaChi: 'string',
                hotline: 'string',
            },
        },
    ],
});
function addSuKien(tenSuKien, benhVienPhuTrach, soLuongToiDa) {
    realm.write(() => {
      realm.create('SuKien', {
        tenSuKien,
        benhVienPhuTrach,
        soLuongDaDangKy: 0,
        soLuongToiDa,
        banner: 'https://example.com/banner.png',
      });
    });
  }
  
  function addBenhVien(tenBenhVien, diaChi, hotline) {
    realm.write(() => {
      realm.create('BenhVien', {
        tenBenhVien,
        diaChi,
        hotline,
      });
    });
  }

// Thêm dữ liệu vào Realm
addSuKien('Sự kiện 2', 'Bệnh viện A', 0, 100, 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_640.jpg');
addBenhVien('Bệnh viện b', 'Địa chỉ b', '0963214587');

const suKienData = realm.objects('SuKien');
const benhVienData = realm.objects('BenhVien');

console.log("SK: ", suKienData);
console.log("BV:", benhVienData);
