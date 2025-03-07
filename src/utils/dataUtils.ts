import fs from 'fs';
import path from 'path';

interface SaveDataOptions {
  type: 'users' | 'alumni' | 'colleges';
  data: any;
}

export const saveData = async ({ type, data }: SaveDataOptions) => {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', `${type}.json`);
    const existingData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    // Add new data with a new ID
    const newId = Math.max(...existingData[type].map((item: any) => item.id)) + 1;
    const newData = { ...data, id: newId };
    
    // Update the file
    existingData[type].push(newData);
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
    
    return newData;
  } catch (error) {
    console.error('Error saving data:', error);
    throw error;
  }
};

export const updateData = async ({ type, data }: SaveDataOptions) => {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', `${type}.json`);
    const existingData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    // Update existing data
    const index = existingData[type].findIndex((item: any) => item.id === data.id);
    if (index !== -1) {
      existingData[type][index] = { ...existingData[type][index], ...data };
      fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
      return existingData[type][index];
    }
    
    throw new Error('Item not found');
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
}; 