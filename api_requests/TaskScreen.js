import axios from "axios"


export const fecthData = async () => {
    try {
        const { data } = await axios.get('localhost:3000//test/api/data')
        return data
    } catch (ex) {
        throw ex
    }
}

export const dummy_data = [
    { id: 1, name: 'Tes1', age: 10, dob: '2013-05-16', checked: false },
    { id: 2, name: 'Tes2', age: 20, dob: '2003-03-24', checked: true },
    { id: 3, name: 'Tes3', age: 30, dob: '1994-08-10', checked: false },
  ];