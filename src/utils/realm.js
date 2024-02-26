const Realm= require( "realm");

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
  module.exports = { addSuKien, addBenhVien };