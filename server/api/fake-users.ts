export default defineEventHandler(async (event) => {
  type User = {
    id: number;
    name: string;
    email: string;
    status: string;
  };

  // Simulated in-memory database
  let DB_USERS: User[] = [
    {
      id: 1,
      name: "John Doe",
      email: "JohnDow@gmail.com",
      status: "active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "JaneSmith@gmail.com",
      status: "inactive",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "AliceJohnson@gmail.com",
      status: "active",
    },
    {
      id: 4,
      name: "Bob Brown",
      email: "BobBrown@gmail.com",
      status: "inactive",
    },
    {
      id: 5,
      name: "Charlie Davis",
      email: "CharlieDavis@gmail.com",
      status: "active",
    },
    {
      id: 6,
      name: "Diana Evans",
      email: "DianaEvans@gmail.com",
      status: "inactive",
    },
    {
      id: 7,
      name: "Ethan Harris",
      email: "EthanHarris@gmail.com",
      status: "active",
    },
    {
      id: 8,
      name: "Fiona Green",
      email: "FionaGreen@gmail.com",
      status: "inactive",
    },
    {
      id: 9,
      name: "George Hill",
      email: "GeorgeHill@gmail.com",
      status: "active",
    },
    {
      id: 10,
      name: "Hannah King",
      email: "HannahKing@gmail.com",
      status: "inactive",
    },
  ];

  const query = getQuery(event);
  const method = event.node.req.method;

  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        // Get all users or a single user by ID
        if (method === "GET") {
          if (query.id) {
            // Get Single User by ID
            const user = DB_USERS.find((u) => u.id === Number(query.id));
            if (!user) {
              return reject({ error: "User not found" });
            }
            return resolve(user);
          }
          // Return all users if no ID is provided
          return resolve(DB_USERS);
        }

        // Add User
        if (method === "POST") {
          const body = await readBody(event);
          const newUser: User = {
            id: DB_USERS.length + 1, // auto-increment ID
            name: body.name,
            email: body.email,
            status: body.status || "active",
          };
          DB_USERS.push(newUser);
          return resolve({ message: "User added", newUser });
        }

        // Update User
        if (method === "PUT") {
          const body = await readBody(event);
          const userIndex = DB_USERS.findIndex((u) => u.id === Number(body.id));
          if (userIndex === -1) {
            return reject({ error: "User not found" });
          }
          DB_USERS[userIndex] = { ...DB_USERS[userIndex], ...body };
          return resolve({
            message: "User updated",
            updatedUser: DB_USERS[userIndex],
          });
        }

        // Delete User
        if (method === "DELETE") {
          if (query.id) {
            const userIndex = DB_USERS.findIndex(
              (u) => u.id === Number(query.id)
            );
            if (userIndex === -1) {
              return reject({ error: "User not found" });
            }

            DB_USERS = DB_USERS.filter((u) => u.id !== Number(query.id));

            return resolve({ message: "User deleted", DB_USERS });
          }
        }

        // Handle unsupported methods
        return reject({ error: "Method not supported" });
      } catch (error) {
        return reject({
          error: "An error occurred",
          details: (error as Error).message,
        });
      }
    }, 1000); // Simulate delay of 1 second
  });
});
