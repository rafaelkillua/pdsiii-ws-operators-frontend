import React, { useState, useCallback, useMemo } from 'react'
import {
  Container,
  AppBar,
  Typography,
  Toolbar,
  Grid,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  IconButton,
  TextField,
  Paper,
  Divider
} from '@material-ui/core'
import {
  Tv,
  Computer,
  DoubleArrow,
  Remove,
  AccessAlarm,
  StayPrimaryPortrait,
  AirplanemodeActive,
  AttachFile,
  Headset,
  Casino,
  Kitchen
} from '@material-ui/icons'

import Payment from './Payment'

const App = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'TV 4k',
      icon: Tv,
      price: 20000,
      quantity: 1
    },
    {
      id: 2,
      name: 'PC gamer',
      icon: Computer,
      price: 42000,
      quantity: 1
    },
    {
      id: 3,
      name: 'Smartphone',
      icon: StayPrimaryPortrait,
      price: 12300,
      quantity: 1
    },
    {
      id: 4,
      name: 'Alarme smart',
      icon: AccessAlarm,
      price: 9800,
      quantity: 1
    },
    {
      id: 5,
      name: 'Avião smart',
      icon: AirplanemodeActive,
      price: 84000,
      quantity: 1
    },
    {
      id: 6,
      name: 'Clipe de papel smart',
      icon: AttachFile,
      price: 990,
      quantity: 1
    },
    {
      id: 7,
      name: 'Headset gamer',
      icon: Headset,
      price: 11200,
      quantity: 1
    },
    {
      id: 8,
      name: 'Dado gamer',
      icon: Casino,
      price: 1500,
      quantity: 1
    },
    {
      id: 9,
      name: 'Geladeira smart',
      icon: Kitchen,
      price: 31000,
      quantity: 1
    }
  ])
  const [cart, setCart] = useState([])
  const [isPaying, setIsPaying] = useState(false)

  const addToCart = useCallback(itemId => {
    const itemToAdd = items.find(item => item.id === itemId)
    setItems(prevItems => prevItems.filter(item => item.id !== itemId))
    setCart(prevCart => [...prevCart, itemToAdd])
  }, [items])

  const removeFromCart = useCallback(itemId => {
    const itemToRemove = cart.find(cartItem => cartItem.id === itemId)
    itemToRemove.quantity = 1
    setItems(prevItems => [...prevItems, itemToRemove])
    setCart(prevCart => prevCart.filter(cartItem => cartItem.id !== itemId))
  }, [cart])

  const handleQuantityChange = useCallback(evt => {
    evt.persist()
    if (evt.target.value > 0) {
      const itemId = evt.target.name.split('_')[1]
      setCart(prevCart => prevCart.map(cartItem => cartItem.id === +itemId ? { ...cartItem, quantity: evt.target.value } : cartItem))
    }
  }, [])

  const cartTotal = useMemo(() => {
    if (cart.length > 0) {
      return cart.reduce((sum, cartItem) => sum + (cartItem.price * cartItem.quantity), 0)
    }
    return 0
  }, [cart])

  return (
    <div className="root">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Carrinho
          </Typography>
        </Toolbar>
      </AppBar>
      <Box mt={4}>
        <Container maxWidth="xl">
          <Grid container spacing={2} direction="row">
            <Grid item xs={6}>
              <Paper>
                {!items.length &&
                <Grid container justify="center" alignItems="center">
                  <Box my={2}>
                    <Typography>
                      Todos os itens estão no carrinho. Compre!
                    </Typography>
                  </Box>
                </Grid>
                }
                <List>
                  {items.map(item => (
                    <div key={item.id}>
                      <Divider/>
                      <ListItem>
                        <Grid container direction="row" alignItems="center">
                          <Grid item xs={6}>
                            <Grid container direction="row" alignItems="center">
                              <Box mr={2}>
                                <item.icon />
                              </Box>
                              <ListItemText>{item.name}</ListItemText>
                            </Grid>
                          </Grid>
                          <Grid item xs={6}>
                            <Grid container direction="row" justify="flex-end" alignItems="center">
                              <Box mr={2}>
                                <Typography>R$ {(item.price / 100).toFixed(2)}</Typography>
                              </Box>
                              <IconButton disabled={isPaying} onClick={() => addToCart(item.id)}>
                                <DoubleArrow/>
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Grid>
                      </ListItem>
                    </div>))}
                </List>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper>
                {!cart.length &&
                <Grid container justify="center" alignItems="center">
                  <Box my={2}>
                    <Typography>
                    Não há itens no carrinho. Adicione!
                    </Typography>
                  </Box>
                </Grid>
                }
                <List>
                  {cart.map(cartItem => (
                    <div key={cartItem.id}>
                      <Divider/>
                      <ListItem>
                        <Grid container direction="row" alignItems="center">
                          <Grid item xs={6}>
                            <Grid container direction="row" alignItems="center">
                              <Box mr={2}>
                                <cartItem.icon />
                              </Box>
                              <ListItemText>{cartItem.name}</ListItemText>
                            </Grid>
                          </Grid>
                          <Grid item xs={6}>
                            <Grid container direction="row" justify="flex-end" alignItems="center">
                              <TextField
                                name={`quantity_${cartItem.id}`}
                                label="Qtde"
                                type="number"
                                disabled={isPaying}
                                value={cartItem.quantity}
                                onChange={handleQuantityChange}
                                style={{ width: '4rem' }}
                              />
                              <Box mx={2}>
                                <Typography>R$ {((cartItem.price * cartItem.quantity) / 100).toFixed(2)}</Typography>
                              </Box>
                              <IconButton disabled={isPaying} onClick={() => removeFromCart(cartItem.id)}>
                                <Remove color="error"/>
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Grid>
                      </ListItem>
                    </div>))}
                  {cart.length > 0 && (
                    <>
                      <Divider/>
                      <ListItem>
                        <Grid container justify="flex-end">
                          <Typography>Total: R$ {(cartTotal / 100).toFixed(2)}</Typography>
                        </Grid>
                      </ListItem>
                    </>
                  )}
                </List>
              </Paper>
              {!isPaying && (
                <Grid container justify="flex-end">
                  <Grid item xs={3}>
                    <Box mt={4}>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={!cart.length}
                        onClick={() => setIsPaying(true)}
                      >
                        Finalizar compra
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
          {isPaying && <Payment valorEmCentavos={cartTotal} onCancel={() => setIsPaying(false)} />}
        </Container>
      </Box>

    </div>
  )
}

export default App
