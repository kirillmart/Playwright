import { test, expect } from '../fixtures/loginFixture';
import { userModel } from '../utility/dbUtils/models/userModel';
import data from '../utility/data/user.json' assert { type: 'json' };

  test("Check user is present", async ({ database }) => {
    
    const user = await database.getQuery(`SELECT * FROM User;`).then((rows: userModel[]) => {
        return rows;
    });

    expect(user[0].id).toBe(1);
    expect(user[0].username).toBe(`${data.success.username}`);
    expect(user[0].password).toBe(`${data.success.password}`);

  });

  test("Check user is absent", async ({ database }) => {

    await database.executeQuery(`DELETE FROM User WHERE id = 1;`);
    const user = await database.getQuery(`SELECT * FROM User;`).then((rows: userModel[]) => {
      return rows;
    });
    expect(user.length).toBe(0);
  });

  test("Check user is edited successfully", async ({ database }) => {

    await database.executeQuery(`UPDATE User SET username = 'editedUser', password = 'editedPass' WHERE id = 1;`);
    
    const user = await database.getQuery(`SELECT * FROM User;`).then((rows: userModel[]) => {
        return rows;
    });

    expect(user[0].id).toBe(1);
    expect(user[0].username).toBe("editedUser");
    expect(user[0].password).toBe("editedPass");

  });

