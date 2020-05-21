export 
enum Command {
    CHK,  // Exists / Checks
    GET,  // Retrieve / Get value
    SET,  // Set / Create / Update
    DEL,  // Delete / Remove
    TTL,  // Time to Live,
    NUK,  // Flushes / Nukes all Keys,
    KEY,  // Search / Find Keys
    FND,  // Search / Find Values
};