import axios from 'axios';

export default axios.create({
  baseURL:
    'https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI&',
  headers: {
    'Content-type': 'application/json',
  },
});
