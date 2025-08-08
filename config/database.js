const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Database configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Database utility functions
const db = {
  // Test connection
  async testConnection() {
    try {
      const { data, error } = await supabase
        .from('your_table_name')
        .select('*')
        .limit(1);
      
      if (error) {
        console.log('Database connection test:', error.message);
        return false;
      } else {
        console.log('✅ Successfully connected to Supabase database!');
        return true;
      }
    } catch (err) {
      console.error('❌ Database connection failed:', err.message);
      return false;
    }
  },

  // Get all records from a table
  async getAll(tableName, limit = 100) {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(limit);
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error fetching data from ${tableName}: ${error.message}`);
    }
  },

  // Get record by ID
  async getById(tableName, id) {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error fetching record from ${tableName}: ${error.message}`);
    }
  },

  // Insert new record
  async insert(tableName, data) {
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .insert(data)
        .select();
      
      if (error) throw error;
      return result[0];
    } catch (error) {
      throw new Error(`Error inserting into ${tableName}: ${error.message}`);
    }
  },

  // Update record
  async update(tableName, id, data) {
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .update(data)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return result[0];
    } catch (error) {
      throw new Error(`Error updating ${tableName}: ${error.message}`);
    }
  },

  // Delete record
  async delete(tableName, id) {
    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    } catch (error) {
      throw new Error(`Error deleting from ${tableName}: ${error.message}`);
    }
  }
};

module.exports = { supabase, db }; 