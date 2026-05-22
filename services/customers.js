import { supabaseAdmin } from "../lib/supabaseAdmin";

/** Validate required fields for a customer */
export const createCustomer = async (data) => {
  const { full_name, phone, email, city } = data;
  if (!full_name || !phone || !email) {
    throw new Error("Missing required customer fields");
  }
  const { error, data: result } = await supabaseAdmin.from("customers").insert([
    { full_name, phone, email, city }
  ]);
  if (error) throw error;
  return result[0];
};
