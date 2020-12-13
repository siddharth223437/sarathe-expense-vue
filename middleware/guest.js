export default function (ctx) {
  console.log('in guest')
  const token = localStorage.getItem('token');
  if(token == null){
    return false;
  }
}
