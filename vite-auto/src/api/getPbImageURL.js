export default function getPbImageURL(item, fileName = 'photo') {
  // 일일이 변경되는 api를 직접 변경해줄수 없어서 vite_pb_api로 설정한 환경 변수를 사용
  return `${import.meta.env.VITE_PB_API}/files/${item.collectionId}/${item.id}/${item[fileName]}`;
}
