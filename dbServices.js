const {pool} = require('./dbConfig');

class DbService {
    static instance;

    static getDbServiceInstance() {
        return this.instance ? this.instance : new DbService();
    }

    //get data function
    async getAllData() {
        try {
            // promise where we handle the query,if query successful resolve otherwise reject,if reject go straight to the catch block
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM medicine_category_price;";

                pool.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            //response is a promise object
            // console.log(response); 
            return response;
        } catch (error) {
            console.log(error);
        }
    }


    async insertNewName(medicine_id, medicine_name, round, category_name, picture) {
        try {
            const dateAdded = new Date();
            const response = await new Promise((resolve, reject) => {
                const queryString = `INSERT INTO medicine_category_price (medicine_id, medicine_name, round, category_name, picture, dateadded)
                                     VALUES ($1, $2, $3, $4, $5, $6);`

                pool.query(queryString, [medicine_id, medicine_name, round, category_name, picture, dateAdded], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response); 这个插入数据的response是空的
            // return response;

            return {
                medicine_id: medicine_id,
                medicine_name: medicine_name,
                round: round,
                category_name: category_name,
                picture: picture,
                dateAdded: dateAdded
            };
        } catch (error) {
            console.log(error);
        }
    }

    async deleteRowById(medicine_id) {
        try {
            let id = parseInt(medicine_id, 10); //10 is base
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM medicine_category_price WHERE medicine_id =$1 ;"

                pool.query(query, [medicine_idid], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.rowCount);//rowCount 是要被删除的那一行
                })
            });
            // console.log(response);
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateNameById(medicine_id, medicine_name, round, category_name) {
        console.log(medicine_id)
        try {
            medicine_id = parseInt(medicine_id, 10);
            const response = await new Promise((resolve, reject) => {
                const query1 = "UPDATE medicine_category_price SET medicine_name = $2 ,round=$3,category_name=$4 WHERE medicine_id = $1;";

                pool.query(query1, [medicine_id, medicine_name, round, category_name], (err, result) => {
                    if (err) reject(new Error(err.message));

                    resolve(result.rowCount);
                })

            });
            // console.log(response)
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async searchById(medicine_id) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM medicine_category_price WHERE medicine_id = $1;";

                pool.query(query, [medicine_id], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            console.log(response)
            return response;
        } catch (error) {
            console.log(error);
        }
    }


}

module.exports = DbService;