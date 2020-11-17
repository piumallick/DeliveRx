const {pool} = require('./dbConfig');

class DbService {
    static instance;
    static getDbServiceInstance() {
        return this.instance ? this.instance : new DbService();
    }
    //get data medicines
    async getAllData() {
        try {
            // promise where we handle the query,if query successful resolve otherwise reject,if reject go straight to the catch block
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM medicine_category_price ORDER BY medicine_id;";

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
    //get all suppliers
    async getAllDataSuppliers() {
        try {
            // promise where we handle the query,if query successful resolve otherwise reject,if reject go straight to the catch block
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM supplier ORDER BY supplier_id;";

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

//insert medicine name 
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

    //check for supplier
    async checkSupplier(supplier_id, supplier_name, address, phonenumber, email) {
        try {
            const response = await new Promise((resolve, reject) => {
                const queryString = `SELECT * from supplier WHERE (supplier_id = $1 OR email_address = $2);`

                pool.query(queryString, [supplier_id, supplier_name,address, phonenumber, email], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return { found: 1 };
        } catch (error) {
            return { found: 0 };
        }
    }

    //insert supplier Name
    async insertNewSuppliersName(supplier_id, supplier_name, address, phonenumber, email) {
        try {
            const dateAdded = new Date();
            const response = await new Promise((resolve, reject) => {
                const queryString = `INSERT INTO supplier (supplier_id, supplier_name,address, phone_number, email_address)
                                     VALUES ($1, $2, $3, $4, $5);`

                pool.query(queryString, [supplier_id, supplier_name,address, phonenumber, email], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response); 这个插入数据的response是空的
            // return response;

            return {

                supplier_id: supplier_id,
                supplier_name: supplier_name,
                address: address,
                phonenumber: phonenumber,
                email: email,
            };
        } catch (error) {
            console.log(error);
        }
    }
    // delete for medicine
    async deleteRowById(medicine_id) {
        try {
            let id = parseInt(medicine_id, 10); //10 is base
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM medicine_category_price WHERE medicine_id =$1 ;"

                pool.query(query, [medicine_id], (err, result) => {
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
    //delete for suppliers
    async deleteRowByIdSuppliers(supplier_id) {
        try {
            let id = parseInt(supplier_id, 10); //10 is base
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM supplier WHERE supplier_id =$1 ;"

                pool.query(query, [supplier_id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    if (result) resolve(result.rowCount);//rowCount 是要被删除的那一行
                    else resolve(0);
                })
            });
            // console.log(response);
            return response === 1;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    //update for medicine
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
    //update for suppliers
    async updateNameByIdSuppliers(supplier_id, supplier_name,address, phonenumber, email) {
        
        try {
            supplier_id = parseInt(supplier_id, 10);
            const response = await new Promise((resolve, reject) => {
                const query2 = "UPDATE supplier SET supplier_name = $2 ,address=$3,phone_number=$4,email_address =$5 WHERE supplier_id = $1;";

                pool.query(query2, [supplier_id, supplier_name, address, phonenumber, email], (err, result) => {
                    if (err) reject(new Error(err.message));
                    if (result) {
                        resolve(result.rowCount);
                    }
                })

            });
            // console.log(response)
            return response === 1;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

//search for medicine
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
//search for Supplier
async searchByIdSuppliers(supplier_id) {
    try {
        const response = await new Promise((resolve, reject) => {
            const query = "SELECT * FROM supplier WHERE supplier_id = $1;";

            pool.query(query, [supplier_id], (err, results) => {
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