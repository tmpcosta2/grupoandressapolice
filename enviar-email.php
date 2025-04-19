<?php
// Configurações para o envio de e-mail
$destinatario = "andressapolice@hotmail.com";
$assunto = "Contato via site - Grupo Andressa Police";

// Verificar se o formulário foi enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Coletar dados do formulário
    $nome = filter_input(INPUT_POST, 'nome', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $telefone = filter_input(INPUT_POST, 'telefone', FILTER_SANITIZE_STRING);
    $empresa = filter_input(INPUT_POST, 'empresa', FILTER_SANITIZE_STRING);
    $mensagem = filter_input(INPUT_POST, 'mensagem', FILTER_SANITIZE_STRING);
    
    // Validar dados
    $errors = array();
    
    if (empty($nome)) {
        $errors[] = "Nome é obrigatório";
    }
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "E-mail válido é obrigatório";
    }
    
    if (empty($mensagem)) {
        $errors[] = "Mensagem é obrigatória";
    }
    
    // Se não houver erros, enviar e-mail
    if (empty($errors)) {
        // Preparar corpo do e-mail
        $corpo = "Você recebeu uma mensagem do formulário de contato do site Grupo Andressa Police.\n\n";
        $corpo .= "Nome: " . $nome . "\n";
        $corpo .= "E-mail: " . $email . "\n";
        
        if (!empty($telefone)) {
            $corpo .= "Telefone: " . $telefone . "\n";
        }
        
        if (!empty($empresa)) {
            $corpo .= "Empresa: " . $empresa . "\n";
        }
        
        $corpo .= "Mensagem:\n" . $mensagem . "\n";
        
        // Cabeçalhos do e-mail
        $headers = "From: " . $email . "\r\n";
        $headers .= "Reply-To: " . $email . "\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();
        
        // Tentar enviar o e-mail
        if (mail($destinatario, $assunto, $corpo, $headers)) {
            $response = array(
                'status' => 'success',
                'message' => 'Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.'
            );
        } else {
            $response = array(
                'status' => 'error',
                'message' => 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.'
            );
        }
    } else {
        $response = array(
            'status' => 'error',
            'message' => 'Por favor, corrija os seguintes erros:',
            'errors' => $errors
        );
    }
    
    // Retornar resposta em formato JSON
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}
?>
