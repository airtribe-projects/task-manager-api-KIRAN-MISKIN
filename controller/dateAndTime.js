const createdAt = () => {
  const now = new Date(); 
  const pad = (n) => (n < 10 ? '0' + n : n);

  const day = pad(now.getDate());          
  const month = pad(now.getMonth() + 1);   
  const year = now.getFullYear();         

  const hours = pad(now.getHours());       
  const minutes = pad(now.getMinutes());   

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

module.exports = createdAt;
