/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from 'react'
import { Container, Grid, Box, TextField, Select, FormControl, Input, Paper, Typography, InputLabel, MenuItem, Button, CircularProgress } from '@material-ui/core'
import MaskedInput from 'react-text-mask'

// "numero_cartao": "1111.1111.1111.1111",
// "nome_cliente": "JOSE DA SILVA",
// "bandeira": "mister",
// "cod_seguranca": 111,
// "valor_em_centavos": 500,
// "parcelas": 6,
// "cod_loja": "loja-02"
// "cod_op": "op-01"

const Payment = props => {
  const { valorEmCentavos, onCancel } = props

  const [form, setForm] = useState({
    numero_cartao: '',
    nome_cliente: '',
    cod_seguranca: '',
    bandeira: null,
    parcelas: 1,
    cod_loja: 'loja-01',
    cod_op: 'op-01'
  })

  const [loading, setLoading] = useState(false)

  const handleFormChange = evt => {
    evt.persist()
    setForm(prevForm => ({ ...prevForm, [evt.target.name]: evt.target.name === 'nome_cliente' ? String(evt.target.value).toUpperCase() : evt.target.value }))
  }

  useEffect(() => {
    if (form.numero_cartao.length > 4) {
      switch (form.numero_cartao.slice(0, 4)) {
        case '1111':
          setForm(prevForm => ({ ...prevForm, bandeira: 'mister' }))
          break
        case '2222':
          setForm(prevForm => ({ ...prevForm, bandeira: 'vista' }))
          break
        case '3333':
          setForm(prevForm => ({ ...prevForm, bandeira: 'daciolo' }))
          break
        default:
          setForm(prevForm => ({ ...prevForm, bandeira: null }))
      }
    }
  }, [form.numero_cartao])

  const submit = useCallback(() => {
    try {
      setLoading(true)
    } catch (error) {

    }
  }, [])

  return (
    <Box mt={4}>
      <Paper>
        <Box mt={4}>
          <Container maxWidth="xl">
            <Grid container direction="column" alignItems="center">
              <Grid item xs={12} sm={8} md={6} style={{ width: '100%' }}>
                <Grid container direction="column" alignItems="center">
                  <Typography variant="h6">Dados de pagamento</Typography>
                  <Box mb={2} width="100%">
                    <FormControl fullWidth>
                      <InputLabel htmlFor="numero_cartao">Número do cartão</InputLabel>
                      <Input
                        id="numero_cartao"
                        name="numero_cartao"
                        value={form.numero_cartao}
                        onChange={handleFormChange}
                        inputComponent={CardTextInput}
                        fullWidth
                      />
                      <Typography variant="body2" color={form.bandeira ? 'initial' : 'error'}>Bandeira: {form.bandeira || 'inválida'}</Typography>
                    </FormControl>
                  </Box>
                  <Box mb={2} width="100%">
                    <FormControl fullWidth>
                      <TextField
                        name="nome_cliente"
                        label="Nome do cliente no cartão"
                        value={form.nome_cliente}
                        onChange={handleFormChange}
                        fullWidth
                      />
                    </FormControl>
                  </Box>
                  <Box mb={2} width="100%">
                    <FormControl fullWidth>
                      <InputLabel htmlFor="cod_seguranca">Código de segurança</InputLabel>
                      <Input
                        id="cod_seguranca"
                        name="cod_seguranca"
                        value={form.cod_seguranca}
                        onChange={handleFormChange}
                        inputComponent={CvcTextInput}
                        fullWidth
                      />
                    </FormControl>
                  </Box>
                  <Box mb={2} width="100%">
                    <FormControl fullWidth>
                      <InputLabel htmlFor="parcelas-label">Parcelas</InputLabel>
                      <Select
                        labelId="parcelas-label"
                        id="parcelas"
                        name="parcelas"
                        value={form.parcelas}
                        onChange={handleFormChange}
                      >
                        {
                          Array(12).fill(1).map((option, index) => <MenuItem key={option + index} value={option + index}>{option + index}</MenuItem>)
                        }
                      </Select>
                    </FormControl>
                  </Box>
                  <Box mb={4} width="100%">
                    <Grid container justify="space-between">
                      <Typography>Total: {`${form.parcelas} x R$ ${(valorEmCentavos / (form.parcelas * 100)).toFixed(2)}`}</Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={onCancel}
                        disabled={loading}
                      >
                      Cancelar
                      </Button>
                      <Button
                        variant="contained"
                        color={loading ? 'secondary' : 'primary'}
                        onClick={submit}
                      >
                        {loading ? <CircularProgress size={20} /> : 'Pagar'}
                      </Button>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Paper>
    </Box>
  )
}

const CardTextInput = props => {
  const { inputRef, ...other } = props

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null)
      }}
      mask={[/\d/, /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
    />
  )
}

const CvcTextInput = props => {
  const { inputRef, ...other } = props

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null)
      }}
      mask={[/\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
    />
  )
}

export default Payment
