import DatabaseLibrary from "..";

describe('DatabaseLibrary.execute Integration Test - Events Table', () => {
  let dbLibrary: DatabaseLibrary;

  beforeAll(async () => {
    dbLibrary = new DatabaseLibrary();
    await dbLibrary.connect();
  });

  afterAll(async () => {
    await dbLibrary.close();
  });

  test.skip('should insert, select, and delete an event record successfully', async () => {
    const title = 'Test Event';
    const eventDate = new Date('2024-11-10T10:00:00Z');
    const description = 'This is a test event';
    const organizerName = 'Organizer A';

    const insertQuery = `
      INSERT INTO Events (userId, username, title, tags, image, location, eventDate, description, organizerName, attendeesCount, isActive)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;
    `;
    const insertValues = [
      1, 
      'testuser', 
      title, 
      ['test', 'event'], 
      'image.jpg', 
      'Test Location', 
      eventDate, 
      description, 
      organizerName, 
      0,
      true,
    ];

    const insertResult = await dbLibrary.execute(insertQuery, insertValues);
    const insertedEvent = insertResult[0];

    // Verify that the inserted row matches the expected data
    expect(insertedEvent.title).toBe(title);
    expect(insertedEvent.description).toBe(description);
    expect(insertedEvent.eventDate).toStrictEqual(eventDate);
    expect(insertedEvent.createdDate).toBeDefined(); // createdDate should be automatically set
    expect(insertedEvent.isActive).toBe(true);
    expect(insertedEvent.organizerName).toBe(organizerName);

    // Select the record by title
    const selectQuery = `SELECT * FROM Events WHERE title = $1`;
    const selectResult = await dbLibrary.execute(selectQuery, [title]);
    const selectedEvent = selectResult[0];

    // Verify that the selected row matches the inserted data
    expect(selectedEvent.title).toBe(title);
    expect(selectedEvent.eventDate).toStrictEqual(eventDate);
    expect(selectedEvent.description).toBe(description);
    expect(selectedEvent.createdDate).toBeDefined(); // Check that createdDate exists in the selected row

    // Delete the record
    const deleteQuery = `DELETE FROM Events WHERE title = $1 RETURNING *`;
    const deleteResult = await dbLibrary.execute(deleteQuery, [title]);

    // Verify that the record was deleted
    expect(deleteResult.length).toBe(1);
    expect(deleteResult[0].title).toBe(title);
  });
});
