const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

module.exports = async (req, res, next) => {
  try {
    // 1. Lire le token du header
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ error: 'Token manquant' });
    }

    // 2. Extraire le token (enlever "Bearer ")
    const token = authHeader.replace('Bearer ', '');

    // 3. Vérifier avec Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error) {
      return res.status(401).json({ error: 'Token invalide' });
    }

    if(!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé' });
    }
    // 4. Ajouter l'utilisateur aux requêtes
    req.user = user;

    next();

  } catch (error) {
    res.status(401).json({ error: 'Non autorisé' });
  }
};