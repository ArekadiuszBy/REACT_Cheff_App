/* eslint-disable import/no-anonymous-default-export */
//Zamienia objekt zwracany przez bazę danych (recipes w firebase) do tablicy

export default (obj) => (       //zwykłe nawiasy zamiast {} daje return
    Object.entries(obj || {})         //jeśli nic nie zostanie przekazane to wstawiamy pusty obiekt, by błedu nie wywaliło
    .map(el => (
        typeof el[1] === 'object' ?         //? - sprawdzanie czy to obiekt, a nie string
        {
            key: el[0],
            ...el[1]    //split operator, rozpakowanie drugiego elementu tablicy
        }
        :
        {
            key: el[0],
            value: el[1] 
        }
    ))
)