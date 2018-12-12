import o from 'o.js'
export default function odataget(uri) {
  	return new Promise((resolve, reject) => {
	    o(uri).get((data)=>resolve(data),(status)=>reject(status))
	})
}			
